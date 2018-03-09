class CreateMetaWords < ActiveRecord::Migration[5.1]
  def change
    create_table :meta_words do |t|
      t.string :word
      t.string :pos
      t.integer :order
      t.belongs_to :meta_step, index: true

      t.timestamps
    end
  end
end
