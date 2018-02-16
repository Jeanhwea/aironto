require 'test_helper'

class PortDefinitionsControllerTest < ActionDispatch::IntegrationTest
  test "should get new" do
    get port_definitions_new_url
    assert_response :success
  end

  test "should get create" do
    get port_definitions_create_url
    assert_response :success
  end

  test "should get update" do
    get port_definitions_update_url
    assert_response :success
  end

end
