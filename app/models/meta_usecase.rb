class MetaUsecase < ApplicationRecord
  belongs_to :project
  has_many :meta_flows
end
