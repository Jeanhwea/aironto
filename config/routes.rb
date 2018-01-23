Rails.application.routes.draw do

  resources :concepts
  # get 'concepts/index'
  # get 'concepts/show'
  # get 'concepts/new'
  # get 'concepts/edit'
  # post 'concepts/create'

  resources :templates
  # get 'templates/index'
  # get 'templates/new'
  # get 'templates/edit'
  # post 'templates/create'

  resources :projects
  # get 'projects/index'
  # get 'projects/show'
  # get 'projects/new'
  # post 'projects/create'

  # usecases
  get 'usecases/new'
  post 'usecases' => 'usecases#create'
  resources :projects do
    resources :usecases, only: [:show, :edit, :update]
  end

  # main page
  get 'main' => 'main#index'

  root 'main#index'
  # For details on the DSL available within this file, see http://guides.rubyonrails.org/routing.html
end
