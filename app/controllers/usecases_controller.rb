class UsecasesController < ApplicationController
  def new
    @usecase = Usecase.new
  end

  def create
    @project = Project.find(usecase_params[:project_id])
    @usecase = @project.usecases.create(usecase_params)
    redirect_to project_path(@project)
  end

  def update
  end

  private
    def usecase_params
      params.require(:usecase).permit(:title, :usecase, :project_id, :content)
    end

end
