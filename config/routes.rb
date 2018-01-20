Rails.application.routes.draw do
  # resources :concepts
  get 'concepts/index'
  get 'concepts/show'
  get 'concepts/new'
  get 'concepts/edit'
  get 'concepts/create'

  # main page
  get 'main/index'

  root 'main#index'
  # For details on the DSL available within this file, see http://guides.rubyonrails.org/routing.html
end
