class Relation < ApplicationRecord
  belongs_to :concept
  belongs_to :template
  validates :name, presence: true
end
