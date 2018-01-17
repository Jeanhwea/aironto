class Relation < ApplicationRecord
  belongs_to :concept
  belongs_to :templates
end
