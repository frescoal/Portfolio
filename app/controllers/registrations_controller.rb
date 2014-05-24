# app/controllers/registrations_controller.rb
class RegistrationsController < Devise::RegistrationsController
  before_filter :configure_permitted_parameters, if: :devise_controller?


  def new
    super
  end

  def create
    @user = User.new(user_params)

    respond_to do |format|
      if @user.save
        format.html { redirect_to @user, notice: 'User was successfully created.' }
      else
      end
    end
  end

  def update
	self.resource = resource_class.to_adapter.get!(send(:"current_#{resource_name}").to_key)
    prev_unconfirmed_email = resource.unconfirmed_email if resource.respond_to?(:unconfirmed_email)
	@user.update(user_params)
    resource_updated = update_resource(resource, account_update_params)
    
    yield resource if block_given?
    if resource_updated
      sign_in resource_name, resource, bypass: true
      respond_with resource, location: after_update_path_for(resource)
    else
      clean_up_passwords resource
      respond_with resource
    end
  end


  private

  def configure_permitted_parameters
      devise_parameter_sanitizer.for(:sign_up) { |u| u.permit(:username, :email, :password, :password_confirmation, :remember_me,:firstname,:lastname,:photo) }
      devise_parameter_sanitizer.for(:sign_in) { |u| u.permit(:login, :username, :email, :password, :remember_me,:firstname,:lastname,:photo) }
      devise_parameter_sanitizer.for(:account_update) { |u| u.permit(:username, :email, :password, :password_confirmation, :current_password,:firstname,:lastname,:photo) }
    end

  def user_params
      params.require(:user).permit(:firstname, :lastname, :photo, :email, :password, :password_confirmation, :current_password)
  end

  def update_resource(resource, params)
    resource.update_with_password(params)
  end
end 