class Relation < ApplicationRecord
  belongs_to :concept
  belongs_to :template
end
