class CreateMetaUsecases < ActiveRecord::Migration[5.1]
  def change
    create_table :meta_usecases do |t|
      t.string :name
      t.string :description
      t.string :dependency
      t.string :precondition
      t.references :project, foreign_key: true

      t.timestamps
    end
  end
end
