require "uri"
require "rexml/document"
require "json"

namespace :exp do

  desc "do consistency check for this project"
  task :check, [:project_id] => [:environment] do |t, args|

    project_id = (args.project_id || 0).to_i
    project = Project.find(project_id) if project_id > 0
    if project
      puts project.inspect
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

end
