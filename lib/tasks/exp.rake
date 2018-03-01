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
          puts sent, res if res
        end
      end
    end

    # begin
    #   res = ltp_seg('我爱北京天安门')
    #   puts res.inspect
    # rescue
    #   puts "Error: please start ltp server"
    # end

  end

  def ltp_seg text

    params = {"x": "n", "t": "all", "s": text}
    uri = URI.parse("http://localhost:12345/ltp")
    respond = Net::HTTP.post_form(uri, params)

    doc = REXML::Document.new(respond.body)
    first_sent = REXML::XPath.first(doc, "//sent")
    if first_sent
      result = first_sent.elements.map do |word|
        { word: word.attributes["cont"], pos: word.attributes["pos"] }
      end
    end

  end

end
