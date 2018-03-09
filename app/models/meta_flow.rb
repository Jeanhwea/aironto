class MetaFlow < ApplicationRecord
  belongs_to :meta_usecase
  has_many :meta_steps
  validates :key, presence: true
end
