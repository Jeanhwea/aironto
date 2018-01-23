class Project < ApplicationRecord
  has_many :usecases
  validates :name, presence: true
end
