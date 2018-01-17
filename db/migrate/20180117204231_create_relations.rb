class CreateRelations < ActiveRecord::Migration[5.1]
  def change
    create_table :relations do |t|
      t.belongs_to :concept, index: true
      t.belongs_to :template, index: true

      t.integer :order
      t.string :name
      t.text :description

      t.timestamps
    end
  end
end
