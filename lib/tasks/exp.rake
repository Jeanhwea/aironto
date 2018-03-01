namespace :exp do

  desc "do segmentation for all usecases in a specific project"
  task :seg, [:project_id] => [:environment] do |t, args|

    project_id = (args.project_id || 0).to_i

    project = Project.find(project_id) if project_id > 0
    if project
      puts project.inspect
    end
  end

end
