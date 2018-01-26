class Template < ApplicationRecord
  has_many :relations
  has_many :concepts, :through => :relations
end
