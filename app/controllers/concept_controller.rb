class ConceptController < ApplicationController
  def index
    @concepts = Concept.all
  end

  def show
    @concept = Concept.find(params[:id])
  end

  def new
    @concept = Concept.new
  end

  def edit
    @concept = Concept.find(params[:id])
  end

  def create
    @concept = Concept.new(concept_params)

    if @concept.save
      redirect_to @concept
    else
      render 'new'
    end
  end

  private
    def concept_params
      params.require(:concept).permit(:name, :description)
    end

end
