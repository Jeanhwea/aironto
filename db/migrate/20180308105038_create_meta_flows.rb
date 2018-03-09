class CreateMetaFlows < ActiveRecord::Migration[5.1]
  def change
    create_table :meta_flows do |t|
      t.string :key
      t.string :value
      t.string :postcondition
      t.belongs_to :meta_usecase, index: true

      t.timestamps
    end
  end
end
