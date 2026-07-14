import { useRef, useState } from "react";
import { useApiQuery } from "../../../hooks/useApiQuery";
import useFetchedDataStatusHandler from "../../../hooks/useFetchedDataStatusHandler";
import API_PATHS from "../../../services/api.paths";
import ProfileTable from "./ProfileTable";
import ProfileUpdateForm from "./ProfileUpdateForm";
import Modal from "../../../components/ui/Modal";
import { LucideMail } from "lucide-react";
import Badge from "../../../components/ui/Badge";
import { useApiMutation } from "../../../hooks/useApiMutation";
import Swal from "sweetalert2";
import { ProfileAvatarForm } from "./ProfileAvatarForm";
import useValidator from "../../../hooks/useValidator";
import { profileValidationRules } from "../../../../../server/src/modules/profile/profile.validation.rules";
import ResetProfilePasswordForm from "./ResetProfilePasswordForm";

const ProfileManagement = () => {
  // AVATAR UPLOAD RELATED (NOT TO CHANG) STATES
  const [avatar, setAvatar] = useState(null);
  const [userProfile, setUserProfile] = useState(null);
  const [userProfileToEdit, setUserProfileToEdit] = useState(null);
  const [selectEdit, setSelectEdit] = useState(null);
  const [uploadProgress, setUploadProgress] = useState(0);
  const fileInputRef = useRef(null);

  // TOGGLE CURRENT PASSWORD VIEW STATES
  const [toggleCurrentPasswordView, setToggleCurrentPasswordView] =
    useState(false);

  // TOGGLE NEW PASSWORD VIEW STATES
  const [toggleNewPasswordView, setToggleNewPasswordView] = useState(false);

  // TOGGLE CONFIRM NEW PASSWORD VIEW STATES
  const [toggleConfirmNewPasswordView, setToggleConfirmNewPasswordView] =
    useState(false);

  // INITIAL FORM STATES
  const getInitialForm = () => ({
    name: "",
    email: "",
  });

  // INITIAL FORM PASSWORD STATES
  const getInitialFormPasswordSates = () => ({
    newPassword: "",
    confirmPassword: "",
  });

  // PROFILE UPDATE (NAME, EMAIL) UPDATE STATES
  const [profileToEdit, setProfileToEdit] = useState(null);
  const [form, setForm] = useState(getInitialForm());

  // CHANGE PASSWORD RELATED STATES (password, newPassword)
  const [selectProfileUser, setSelectProfileUser] = useState(null);
  const [formPassword, setFormPassword] = useState(
    getInitialFormPasswordSates(),
  );

  // Reset form
  const resetForm = () => {
    setForm(getInitialForm());
  };

  // Reset password reset form
  const resetPasswordForm = () => {
    setFormPassword(getInitialFormPasswordSates());
  };

  // Form data mapper to set in form
  const mapProfileToForm = (profile) => ({
    name: profile.name ?? "",
    email: profile.email ?? "",
  });

  const getProfileData = () => ({
    name: form.name,
    email: form.email,
  });

  const getProfilePasswordData = () => ({
    newPassword: formPassword.newPassword,
    confirmPassword: formPassword.confirmPassword,
  });

  /*** ---> PROFILE Query Mutation  fetch permissions API Hook ---> */
  const {
    data: profileUsers,
    isLoading: profileUsersLoading,
    isError: profileUsersError,
    error: profileUsersErrorObj,
  } = useApiQuery({
    url: `${API_PATHS.SUPER_ADMIN_PROFILE.ENDPOINT}/all`,
    queryKey: API_PATHS.SUPER_ADMIN_PROFILE.KEY,
    options: {
      staleTime: 0,
      refetchOnWindowFocus: true,
      refetchOnReconnect: true,
    },
  });

  /*** ------> PROFILE AVATAR UPDATE Mutation  API Hook ------> */
  const updateAvatarMutation = useApiMutation({
    method: "update",
    path: (payload) =>
      `${API_PATHS.SUPER_ADMIN_PROFILE.ENDPOINT}/edit/avatar/${payload?.id}`,
    key: API_PATHS.SUPER_ADMIN_PROFILE.KEY, // used by useQuery

    options: {
      onUploadProgress: (progressEvent) => {
        const percent = Math.round(
          (progressEvent.loaded * 100) / progressEvent.total,
        );
        setUploadProgress(percent);
      },
    },

    onSuccess: (data) => {
      console.log("Avatar/update response:", data);
      setAvatar(null);
      setSelectEdit(null);

      if (fileInputRef.current) {
        fileInputRef.current.value = "";
      }

      Swal.fire({
        position: "top-end",
        icon: "success",
        title: `${data.message}`,
        showConfirmButton: false,
        timer: 1500,
      });
    },
    onError: (error) => {
      setUploadProgress(0);
      Swal.fire({
        position: "top-end",
        icon: "error",
        title: `${error.message}`,
        showConfirmButton: false,
        timer: 1500,
      });
      console.error(error);
    },
  });

  /*** ------> PROFILE (name & email) UPDATE Mutation  API Hook ------> */
  const updateProfileMutation = useApiMutation({
    method: "update",
    path: (payload) =>
      `${API_PATHS.SUPER_ADMIN_PROFILE.ENDPOINT}/edit/profile/${payload?.id}`,
    key: API_PATHS.SUPER_ADMIN_PROFILE.KEY, // used by useQuery

    options: {
      onUploadProgress: (progressEvent) => {
        const percent = Math.round(
          (progressEvent.loaded * 100) / progressEvent.total,
        );
        setUploadProgress(percent);
      },
    },

    onSuccess: (data) => {
      console.log("Profile/update response:", data);
      resetForm();
      setAvatar(null);
      setSelectEdit(null);

      if (fileInputRef.current) {
        fileInputRef.current.value = "";
      }

      Swal.fire({
        position: "top-end",
        icon: "success",
        title: `${data.message}`,
        showConfirmButton: false,
        timer: 1500,
      });
    },
    onError: (error) => {
      setUploadProgress(0);
      Swal.fire({
        position: "top-end",
        icon: "error",
        title: `${error.message}`,
        showConfirmButton: false,
        timer: 1500,
      });
      console.error(error);
    },
  });

  /*** -----> Validator integration -----> */
  const { errors, validate } = useValidator(profileValidationRules, {
    name: form?.name,
    email: form?.email,
  });

  /*** ------> PROFILE (name & email) UPDATE Mutation  API Hook ------> */
  const changePasswordMutation = useApiMutation({
    method: "update",
    path: (payload) =>
      `${API_PATHS.SUPER_ADMIN_PROFILE.ENDPOINT}/reset/password/${payload?.id}`,
    key: API_PATHS.SUPER_ADMIN_PROFILE.KEY, // used by useQuery

    options: {
      onUploadProgress: (progressEvent) => {
        const percent = Math.round(
          (progressEvent.loaded * 100) / progressEvent.total,
        );
        setUploadProgress(percent);
      },
    },

    onSuccess: (data) => {
      console.log("Password/update response:", data);
      resetPasswordForm();

      setSelectEdit(null);

      if (fileInputRef.current) {
        fileInputRef.current.value = "";
      }

      Swal.fire({
        position: "top-end",
        icon: "success",
        title: `${data.message}`,
        showConfirmButton: false,
        timer: 1500,
      });
    },
    onError: (error) => {
      setUploadProgress(0);
      Swal.fire({
        position: "top-end",
        icon: "error",
        title: `${error.message}`,
        showConfirmButton: false,
        timer: 1500,
      });
      console.error(error);
    },
  });

  // **-----> PROFILE HANDLERS -------->*/

  /**======================
  |* ON CHANGE HANDLERS
  |**======================*/

  // Handle Change form value
  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  // Handle password change
  const handlePasswordChange = (e) => {
    setFormPassword({
      ...formPassword,
      [e.target.name]: e.target.value,
    });
  };

  /**==========================================
  |* TOGGLERS TO SHOW AND HIDE PASSWORD FIELDS
  |**==========================================*/

  // Handle toggle current password view
  const handleToggleCurrentPasswordView = () => {
    setToggleCurrentPasswordView((prev) => !prev);
  };

  // Handle toggle new password view
  const handleToggleNewPasswordView = () => {
    setToggleNewPasswordView((prev) => !prev);
  };

  // Handle toggle confirm new password view
  const handleToggleConfirmNewPasswordView = () => {
    setToggleConfirmNewPasswordView((prev) => !prev);
  };

  /**==============================================
  |* LOADER HANDLERS TO SELECT AND VIEW DATA IN UIs
  |**==============================================*/
  // View user profile
  const handleSelectUserProfile = (profileId) => {
    const selectedUserProfile = profileUsers.find(
      (up) => up?._id.toString() === profileId.toString(),
    );
    if (selectedUserProfile) {
      setUserProfile(selectedUserProfile);
    }
  };

  // Selects data to edit user Profile
  const handleEditUserProfile = (profileId) => {
    const selectedUserProfile = profileUsers.find(
      (up) => up?._id.toString() === profileId.toString(),
    );
    if (selectedUserProfile) {
      setUserProfileToEdit(selectedUserProfile);
      setProfileToEdit(selectedUserProfile);
      setForm(mapProfileToForm(selectedUserProfile));
    }
  };

  // Selects data to update Profile avatar
  const handleEditUserAvatar = (profileId) => {
    const selectedUserProfile = profileUsers.find(
      (up) => up?._id.toString() === profileId.toString(),
    );
    if (selectedUserProfile) {
      setSelectEdit(selectedUserProfile);
    }
  };

  // Selects profile user data for password reset
  const handleSelectProfileUser = (profileId) => {
    const selectedUserProfile = profileUsers.find(
      (up) => up?._id.toString() === profileId.toString(),
    );
    if (selectedUserProfile) {
      setSelectProfileUser(selectedUserProfile);
    }
  };

  /**======================================
  |* LOADED DATA CANCEL HANDLERS IN THE UIs
  |**======================================*/

  // Handle cancel profile update (name & email)
  const handleCancelEditUserProfile = () => {
    setUserProfileToEdit(null);
  };

  // Handle cancel avatar edit
  const handleCancelAvatarEdit = () => {
    setSelectEdit(null);
    setAvatar(null);

    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  };

  // Handle cancel profile user data for PASSWORD RESET
  const handleCancelSelectedUserProfile = () => {
    setSelectProfileUser(null);
    resetPasswordForm();
  };

  /**==============================================
  |* FORM SUBMIT DATA HANDLERS FOR CRUD OPERATIONS
  |**==============================================*/

  // Handle update Profile -> UPDATE (name $ email)
  const handleSubmitProfileUpdate = (e) => {
    e.preventDefault();

    if (!validate()) return;
    const payload = {
      id: profileToEdit?._id,
      data: getProfileData(),
    };

    updateProfileMutation.mutate(payload);
  };

  // Handle submit form (AVATAR UPDATE)
  const handleSubmit = (e) => {
    e.preventDefault();

    const formData = new FormData();

    const payload = {
      id: selectEdit?._id,
      data: formData,
    };

    formData.append("avatar", avatar);

    updateAvatarMutation.mutate(payload);
  };

  // Handle update Profile (password) -> (RESET PASSWORD)
  const handleSubmitProfileResetPassword = (e) => {
    e.preventDefault();
    const payload = {
      id: selectProfileUser?._id,
      data: getProfilePasswordData(),
    };

    changePasswordMutation.mutate(payload);
  };

  /** --------> Use Fetched Data Status Handler --------> */
  const profileUsersDataStatus = useFetchedDataStatusHandler({
    isLoading: profileUsersLoading,
    isError: profileUsersError,
    error: profileUsersErrorObj,
    label: "profile-users-super-admin",
  });

  return (
    <div>
      <div className="grid lg:grid-cols-12 grid-cols-1 lg:gap-4 gap-2 justify-between">
        <div
          className={
            userProfileToEdit || selectEdit || selectProfileUser
              ? "lg:col-span-4 col-span-12"
              : "hidden"
          }
        >
          {/* DYNAMIC FORM TITLE DISPLAYED */}
          <div className="">
            <h1 className="lg:text-xl text-sm font-bold flex items-center gap-2">
              {userProfileToEdit
                ? "Profile Update Form (Name, Email)"
                : selectEdit
                  ? "Update Profile Avatar"
                  : selectProfileUser
                    ? "Reset Profile User Password"
                    : ""}
            </h1>
          </div>

          {userProfileToEdit && (
            <ProfileUpdateForm
              userProfileToEdit={userProfileToEdit}
              avatar={avatar}
              setAvatar={setAvatar}
              onCancel={handleCancelEditUserProfile}
              onProfileUpdate={handleSubmitProfileUpdate}
              onHandleChange={handleChange}
              formData={form}
              errors={errors}
            />
          )}

          {selectEdit && (
            <ProfileAvatarForm
              onUpdate={handleEditUserAvatar}
              onCancel={handleCancelAvatarEdit}
              avatar={avatar}
              setAvatar={setAvatar}
              onAvatarUpdate={handleSubmit}
              selectEdit={selectEdit}
              isPending={updateAvatarMutation?.isPending}
              uploadProgress={uploadProgress}
            />
          )}

          {selectProfileUser && (
            <ResetProfilePasswordForm
              onCancel={handleCancelSelectedUserProfile}
              onSubmitHandlePasswordChange={handleSubmitProfileResetPassword}
              isPending={changePasswordMutation?.isPending}
              selectProfileUser={selectProfileUser}
              onToggleCurrentPassword={handleToggleCurrentPasswordView}
              showCurrentPassword={toggleCurrentPasswordView}
              onToggleNewPassword={handleToggleNewPasswordView}
              showNewPassword={toggleNewPasswordView}
              onToggleConfirmNewPassword={handleToggleConfirmNewPasswordView}
              showConfirmNewPassword={toggleConfirmNewPasswordView}
              isPending={changePasswordMutation?.isPending}
              formData={formPassword}
              onPasswordChange={handlePasswordChange}
            />
          )}
        </div>

        <div
          className={`${userProfileToEdit || selectEdit || selectProfileUser ? "lg:col-span-8 col-span-12" : "lg:col-span-12 col-span-8"}`}
        >
          {profileUsersDataStatus?.status !== "success" ? (
            profileUsersDataStatus?.content
          ) : (
            <ProfileTable
              profileUsers={profileUsers}
              onView={handleSelectUserProfile}
              onEditProfile={handleEditUserProfile}
              onEdit={handleEditUserAvatar}
              onSelectProfileUser={handleSelectProfileUser}
              selectProfileUser={selectProfileUser}
            />
          )}
        </div>

        {userProfile && (
          <Modal
            isOpen={userProfile}
            onClose={() => setUserProfile(null)}
            title={`Profile of ${userProfile?.name}`}
          >
            <div className="space-y-2">
              <img
                src={
                  userProfile?.avatarUrl
                    ? userProfile?.avatarUrl
                    : "https://i.ibb.co.com/1z7P2wJ/girl2.jpg"
                }
                alt={userProfile?.name}
                className="rounded-md lg:h-96 w-full"
              />
              <h1 className="lg:text-lg text-sm font-bold">
                {userProfile?.name}
              </h1>

              <p className="flex items-center gap-2 text-sm">
                <LucideMail size={15} /> {userProfile?.email}
              </p>
              <p className="text-sm font-bold flex flex-wrap gap-1.5">
                Roles:&nbsp;
                {userProfile?.roles?.map((r) => (
                  <Badge key={r._id}> {r?.name}</Badge>
                ))}
              </p>
              <p className="text-sm font-bold flex items-center flex-wrap">
                User Status:&nbsp;{" "}
                {userProfile?.isActive ? (
                  <Badge color="green">Active</Badge>
                ) : (
                  <Badge color="red">Inactive</Badge>
                )}
              </p>
            </div>
          </Modal>
        )}
      </div>
    </div>
  );
};

export default ProfileManagement;
