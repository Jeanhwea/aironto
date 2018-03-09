class MetaWord < ApplicationRecord
  belongs_to :meta_step
  validates :word, presence: true
  validates :order, presence: true
end
