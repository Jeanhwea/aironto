class CreateUsecases < ActiveRecord::Migration[5.1]
  def change
    create_table :usecases do |t|
      t.string :title
      t.text :content
      t.references :project, foreign_key: true

      t.timestamps
    end
  end
end
