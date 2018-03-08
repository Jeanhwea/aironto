class CreateMetaSteps < ActiveRecord::Migration[5.1]
  def change
    create_table :meta_steps do |t|
      t.integer :number
      t.string :content
      t.belongs_to :meta_flows, index: true

      t.timestamps
    end
  end
end
