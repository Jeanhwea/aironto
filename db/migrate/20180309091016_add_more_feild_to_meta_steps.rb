class AddMoreFeildToMetaSteps < ActiveRecord::Migration[5.1]
  def change
    add_column :meta_steps, :variable_name, :string
    add_column :meta_steps, :template_name, :string
  end
end
