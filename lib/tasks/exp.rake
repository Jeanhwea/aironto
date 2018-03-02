require "uri"
require "rexml/document"
require "json"

namespace :exp do

  desc "do segmentation for all usecases in a specific project"
  task :seg, [:project_id] => [:environment] do |t, args|

    project_id = (args.project_id || 0).to_i

    project = Project.find(project_id) if project_id > 0
    if project
      project.usecases.each do |uc|
        content = JSON.parse(uc.content)
        content["testflow"]["steps"].each do |sent|
          res = ltp_seg(sent)
          if res
            word_list = res.map{ |e| "#{e[:word]}(#{e[:pos]})" }
            puts word_list.join('/')
          end
        end
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
