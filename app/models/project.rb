class Project < ApplicationRecord
  has_many :usecases
  has_many :port_definitions
  validates :name, presence: true
end
