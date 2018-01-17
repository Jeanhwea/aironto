class Concept < ApplicationRecord
  has_many :relations
  has_many :templates, :through => :relations
end
