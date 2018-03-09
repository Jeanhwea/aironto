class CreateMetaPorts < ActiveRecord::Migration[5.1]
  def change
    create_table :meta_ports do |t|
      t.string :name
      t.string :minimum
      t.string :maximum
      t.string :unit
      t.string :description
      t.references :project

      t.timestamps
    end
  end
end
