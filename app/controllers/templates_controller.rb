class TemplatesController < ApplicationController

  def index
    @templates = []

    Template.all.each do |t|
      template = { id: t.id, name: t.name, description: t.description, concepts: [] }
      t.relations.order(:order).each do |r|
        template[:concepts] << r.concept
      end
      @templates << template
    end

  end

  def show
    t = Template.find(params[:id])
    @template = {id: t.id, name: t.name, description: t.description, concepts: []}
    t.relations.order(:order).each do |r|
      @template[:concepts] << r.concept
    end
  end


  def new
  end

  def edit
  end

  def create
  end
end
