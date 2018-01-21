Rails.application.routes.draw do

  resources :templates
  # get 'templates/index'
  # get 'templates/new'
  # get 'templates/edit'
  # get 'templates/create'

  resources :concepts
  # get 'concepts/index'
  # get 'concepts/show'
  # get 'concepts/new'
  # get 'concepts/edit'
  # get 'concepts/create'

  # main page
  get 'main' => 'main#index'

  root 'main#index'
  # For details on the DSL available within this file, see http://guides.rubyonrails.org/routing.html
end
