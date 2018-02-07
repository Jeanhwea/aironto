class Usecase < ApplicationRecord
  belongs_to :project
  validates :title, presence: true
end
