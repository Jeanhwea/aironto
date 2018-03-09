class CreateMetaPorts < ActiveRecord::Migration[5.1]
  def change
    create_table :meta_ports do |t|
      t.string :name
      t.references :project

      t.timestamps
    end
  end
end
