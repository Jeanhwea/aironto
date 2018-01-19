require 'test_helper'

class ConceptControllerTest < ActionDispatch::IntegrationTest
  test "should get index" do
    get concept_index_url
    assert_response :success
  end

  test "should get show" do
    get concept_show_url
    assert_response :success
  end

  test "should get new" do
    get concept_new_url
    assert_response :success
  end

  test "should get edit" do
    get concept_edit_url
    assert_response :success
  end

  test "should get create" do
    get concept_create_url
    assert_response :success
  end

end
