class MetaStep < ApplicationRecord
  belongs_to :meta_flows
  validates :number, presence: true
  validates :content, presence: true
end
