class ProjectsController < ApplicationController
  def index
    @projects = Project.all
  end

  def show
    p = Project.find(params[:id])
    @project = {id: p.id, name: p.name, description: p.description, usecases: []}
    p.usecases.each do |u|
      @project[:usecases] << u
    end
  end

  def new
    @project = Project.new
  end

  def create
    @project = Project.new(project_params)

    entry = Project.find_by :name => project_params[:name]

    if entry
      render json: { status: :duplicatied_project }
    elsif @project.save
      redirect_to project_path(@project)
    else
      render json: { status: :forbid_addition }.to_json
    end

  end

  private
    def project_params
      params.require(:project).permit(:name, :description)
    end

end
