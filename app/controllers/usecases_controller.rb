class UsecasesController < ApplicationController
  def new
    @usecase = Usecase.new
  end

  def create
    @project = Project.find(usecase_params[:project_id])
    @usecase = @project.usecases.create(usecase_params)

    respond_to do |format|
      if @usecase
        @status = :ok
        format.json
      else
        @status = :unprocessable_entity
        format.json
      end
    end
  end

  def update
    @usecase = Usecase.find(params[:id])

    respond_to do |format|
      if @usecase.update(usecase_params)
        @status = :ok
        format.json
      else
        @status = :unprocessable_entity
        format.json
      end
    end
  end

  private
    def usecase_params
      params.require(:usecase).permit(:title, :content, :project_id)
    end

end
