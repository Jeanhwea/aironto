require 'test_helper'

class UsecasesControllerTest < ActionDispatch::IntegrationTest
  test "should get new" do
    get usecases_new_url
    assert_response :success
  end

  test "should get create" do
    get usecases_create_url
    assert_response :success
  end

end
