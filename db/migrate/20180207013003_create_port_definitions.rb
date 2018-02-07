class CreatePortDefinitions < ActiveRecord::Migration[5.1]
  def change
    create_table :port_definitions do |t|
      t.string :name
      t.text :content
      t.references :project, foreign_key: true

      t.timestamps
    end
  end
end
