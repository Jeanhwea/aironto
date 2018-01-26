# This file should contain all the record creation needed to seed the database with its default values.
# The data can then be loaded with the rails db:seed command (or created alongside the database with db:setup).
#
# Examples:
#
#   movies = Movie.create([{ name: 'Star Wars' }, { name: 'Lord of the Rings' }])
#   Character.create(name: 'Luke', movie: movies.first)
#

require 'csv'

class ConceptImporter

  def initialize
    @keyname = :name
    @fieldsname = [:name, :description]
  end

  def add_concept **fields
    entry = Concept.find_by @keyname => fields[@keyname]
    if entry
      fields.each do |k, v|
        entry[k] = v if k != @keyname
      end
      entry.save
    else
      entry = Concept.create(fields)
    end
    entry
  end

  def import_data datafile
    CSV.foreach(datafile) do |row|
      args = Hash.new
      row.each_with_index do |v, i|
        args[@fieldsname[i]] = v.strip
      end
      add_concept args
    end
  end

end


concept_importer = ConceptImporter.new
concept_importer.import_data "db/data/concepts.csv"

class TemplateImporter

  def initialize
    @keyname = :name
    @fieldsname = [:name, :description]
  end

  def add_relation template, concept, order
    name = "#{template[:name]}/#{concept[:name]}"
    entry = Relation.find_by name: name
    if entry
      entry.template = template
      entry.concept = concept
      entry.order = order
      entry.save
    else
      entry = Relation.create(name: name, order: order, template: template, concept: concept)
    end
    entry
  end

  def add_template **fields
    entry = Template.find_by @keyname => fields[@keyname]
    if entry
      fields.each do |k, v|
        entry[k] = v if k != @keyname
      end
      entry.save
    else
      entry = Template.create(fields)
    end
    entry
  end

  def add_sentence name, sentence
    sentence.each_with_index do |word, order|
      # 查询包含的概念，没用的话直接退出
      concept = Concept.find_by name: word
      if not concept
        raise "Concept(#{word}) not found, please add it"
      end
      # 获取模板实例
      template = add_template name: name, description: name
      add_relation template, concept, order
    end
  end

  def import_data datafile
    CSV.foreach(datafile) do |row|
      name, sentence = row[0], row[1..-1]
      add_sentence name, sentence
    end
  end

end

template_importer = TemplateImporter.new
template_importer.import_data "db/data/templates.csv"
