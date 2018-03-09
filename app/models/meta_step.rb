class MetaStep < ApplicationRecord
  belongs_to :meta_flow
  has_many :meta_words
  validates :number, presence: true
  validates :content, presence: true
end
