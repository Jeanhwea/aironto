require "uri"
require "rexml/document"
require "json"

namespace :exp do

  desc "do consistency check for this project"
  task :check, [:project_id] => [:environment] do |t, args|

    project_id = (args.project_id || 0).to_i
    project = Project.find(project_id) if project_id > 0
    if project
      # check_variable_uniqueness project
      # check_usecase_link_completeness project
      check_rfs_link_completeness project
    end

  end

  def check_variable_uniqueness project
    MetaUsecase.where(project: project).each do |uc|
      variables = []
      uc.meta_flows.each do |f|
        if f.key == 'Basic'
          f.meta_steps.each do |s|
            if s.variable_name == ""
              next
            end
            if variables.include? s.variable_name
              puts "duplicate variable: #{s.variable_name} in #{uc.name}(#{s.number})"
            else
              variables << s.variable_name
            end
          end
        end
      end
    end
  end

  def check_usecase_link_completeness project
    usecases = MetaUsecase.where(project: project).map &:name
    usecases << "无"
    MetaUsecase.where(project: project).each do |uc|
      dependencies = uc.dependency.split("/")
      dependencies.each do |dep|
        if not usecases.include? dep
          puts "dependency incomplete: #{dep} in #{uc.name}"
        end
      end
    end
  end

  def check_rfs_link_completeness project
    MetaUsecase.where(project: project).each do |uc|
      variables = []
      basic_flow = uc.meta_flows.select{ |f| f.key == "Basic" }.first
      uc.meta_flows.each do |f|
        if f.key == 'RFS'
          rfs_value = f.value.split(",")
          rfs_value.each do |str|
            rfs = str.to_i
            if rfs < basic_flow.meta_steps.length and basic_flow.meta_steps[rfs].template_name != 'validation'
              puts "rfs incomplete: #{rfs} in #{uc.name}"
            end
          end
        end
      end
    end
  end

  desc "link relation for ontology and steps in this project"
  task :link, [:project_id] => [:environment] do |t, args|

    project_id = (args.project_id || 0).to_i
    project = Project.find(project_id) if project_id > 0
    if project
      tempaltes = Template.all
      steps = MetaStep.all
      t = belongs_to_this_template steps.first, tempaltes
      puts t.concepts.map{|c| c.name}.join("/")
    end

  end

  def belongs_to_this_template meta_step, tempaltes_list
    words_list = meta_step.meta_words
    tempaltes_list.each do |t|
      found = true
      t.concepts.each_with_index do |c, i|
        if i < words_list.length
          w = words_list[i]
          if ['n', 'v'].include? w.pos and w.word != c.name
            found = false
          end
        end
      end
      if found
        return t
      end
    end
  end

  desc "do segmentation for all usecases in a specific project"
  task :seg, [:project_id] => [:environment] do |t, args|

    project_id = (args.project_id || 0).to_i
    project = Project.find(project_id) if project_id > 0
    if project
      project.usecases.each do |uc|
        content = JSON.parse(uc.content)
        meta_uc = MetaUsecase.create(project: project)
        # feilds
        meta_uc.name = content["name"]
        meta_uc.description = content["description"]
        meta_uc.dependency = content["dependency"].split(",").map{|s| s.gsub(/INCLUDE USE CASE/, "").strip }.join("/")
        meta_uc.precondition = content["precondition"]
        meta_uc.save
        # basic flow
        parse_flow_data content["testflow"], meta_uc
        # global
        content["globalValidation"].each do |f|
          parse_flow_data f, meta_uc
        end
        # specific
        content["specificValidation"].each do |f|
          parse_flow_data f, meta_uc
        end

      end
    end

  end

  def parse_flow_data flow, meta_usecase
    puts flow
    meta_flow = MetaFlow.create(key: flow["conditionKey"], value: flow["conditionValue"], postcondition: flow["postcondition"], meta_usecase: meta_usecase)
    flow["steps"].each_with_index do |content, idx|
      meta_step = MetaStep.create(number: idx, content: content, meta_flow: meta_flow)
      res = ltp_seg(content)
      res.each_with_index do |e, i|
        meta_word = MetaWord.create(word: e[:word], pos: e[:pos], order: i, meta_step: meta_step)
      end
    end
  end

  def ltp_seg text
    params = {"x": "n", "t": "pos", "s": text}
    uri = URI.parse("http://localhost:12345/ltp")
    respond = Net::HTTP.post_form(uri, params)

    begin
      doc = REXML::Document.new(respond.body)
      first_sent = REXML::XPath.first(doc, "//sent")
      if first_sent
        result = first_sent.elements.map do |word|
          { word: word.attributes["cont"], pos: word.attributes["pos"] }
        end
      end
    rescue Exception => e
      puts e.message
      puts e.backtrace.inspect
    end

  end

  desc "foo job"
  task :foo, [:project_id] => [:environment] do |t, args|
    MetaStep.all.each do |s|
      s.template_name = 'measure' if s.content.include? '测量'
      s.save
    end
  end

end
