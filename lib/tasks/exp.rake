require "open-uri"
require "uri"

namespace :exp do

  desc "do segmentation for all usecases in a specific project"
  task :seg, [:project_id] => [:environment] do |t, args|

    project_id = (args.project_id || 0).to_i

    project = Project.find(project_id) if project_id > 0
    if project
      # puts project.inspect
    end

    res = ltp_seg '我爱北京天安门'
    puts res
  end

  def ltp_seg text
    params = {"x": "n", "t": "all", "s": text}
    uri = URI.parse("http://localhost:12345/ltp")
    doc = Net::HTTP.post_form(uri, params)
    doc.body
  end

end
