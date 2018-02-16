class PortDefinitionsController < ApplicationController
  def new
    @port_definition = PortDefinition.new
  end

  def create
    @project = Project.find(port_definition_params[:project_id])

    entry = PortDefinition.find_by :project => @project, :name => port_definition_params[:name]


    if entry
      render json: { status: :duplicatied_port_definition }
    else
      @port_definition = @project.port_definitions.create(port_definition_params)

      respond_to do |format|
        if @port_definition
          @status = :ok
          format.json
        else
          @status = :unprocessable_entity
          format.json
        end
      end
    end

  end

  def update
    @port_definition = PortDefinition.find(params[:id])

    respond_to do |format|
      if @port_definition.update(port_definition_params)
        @status = :ok
        format.json
      else
        @status = :unprocessable_entity
        format.json
      end
    end
  end

  private
    def port_definition_params
      params.require(:port_definition).permit(:name, :content, :project_id)
    end

end
