import { useState } from "react";
import { useApiMutation } from "../../../hooks/useApiMutation";
import { useApiQuery } from "../../../hooks/useApiQuery";
import useFetchedDataStatusHandler from "../../../hooks/useFetchedDataStatusHandler";
import API_PATHS from "../../../services/api.paths";
import PlanForm from "./PlanForm";
import PlansTable from "./PlansTable";
import Swal from "sweetalert2";
import useValidator from "../../../hooks/useValidator";
import { planValidationRules } from "./planValidationRules";

const PLAN_LIMIT_PRESETS = {
  starter: {
    maxUploads: 5,
    maxRequests: 100,
    maxProducts: 10,
    maxAdmins: 1,
  },
  pro: {
    maxUploads: 50,
    maxRequests: 1000,
    maxProducts: 100,
    maxAdmins: 2,
  },
  enterprise: {
    maxUploads: 200,
    maxRequests: 10000,
    maxProducts: 1000,
    maxAdmins: 5,
  },
};

const PlansManagement = () => {
  const [planToUpdate, setPlanToUpdata] = useState(null);

  const [form, setForm] = useState({
    name: "",
    slug: "",
    features: "",
    limitPackages: {},
    description: "",
    durationInDays: "",
    price: "",
  });

  /*** -----> Validator integration -----> */
  const { errors, validate } = useValidator(planValidationRules, {
    name: form.name,
    slug: form.slug,
    description: form.description,
    features: form.features,
    durationInDays: form.durationInDays,
    price: form.price,
    limitPackages: form.limitPackages || {},
    packageType: form.packageType, // IMPORTANT
  });

  /**------  Fetches all plans for super admin ------*/
  const {
    data: plans,
    isLoading: plansLoading,
    isError: plansError,
    error: plansErrorObj,
  } = useApiQuery({
    url: `${API_PATHS.SUPER_ADMIN_PLANS.ENDPOINT}/all`,
    queryKey: API_PATHS.SUPER_ADMIN_PLANS.KEY,
    options: {
      staleTime: 0,
      refetchOnWindowFocus: true,
      refetchOnReconnect: true,
    },
  });

  /*** ------> Role Mutation CREATE/UPDATE API Hook ------> */
  const planMutation = useApiMutation({
    method: planToUpdate ? "update" : "create",
    path: planToUpdate
      ? (payload) =>
          `${API_PATHS.SUPER_ADMIN_PLANS.ENDPOINT}/edit/${payload.planId}`
      : `${API_PATHS.SUPER_ADMIN_PLANS.ENDPOINT}/create`,
    key: API_PATHS.SUPER_ADMIN_PLANS.KEY, // used by useQuery

    onSuccess: (data) => {
      setPlanToUpdata(null);
      setForm({
        name: "",
        slug: "",
        features: "",
        limitPackages: {},
        description: "",
        durationInDays: "",
        price: "",
      });
      console.log("Plan create/update response:", data);
      Swal.fire({
        position: "top-end",
        icon: "success",
        title: `${data.message}`,
        showConfirmButton: false,
        timer: 1500,
      });
    },
    onError: (error) => {
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

  /**------  HANDLERS ------*/
  const handleSelectPlan = (planId) => {
    const selected = plans?.find((p) => p._id === planId);
    setPlanToUpdata(selected);
    setForm({
      name: selected.name || "",
      slug: selected.slug || "",
      description: selected.description || "",
      features: selected.features || "",
      durationInDays: selected.durationInDays || "",
      price: selected.price || 0,
      limitPackages: selected.limitPackages || {},
      packageType: selected.packageType || "", // IMPORTANT
    });
  };

  const handleChange = (e) => {
    const { name, value } = e.target;

    if (name === "features") {
      setForm((prev) => ({
        ...prev,
        features: value, // keep as string in UI
      }));
      return;
    }

    setForm((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleCancel = () => {
    setPlanToUpdata(null);
    setForm({
      name: "",
      slug: "",
      features: "",
      limitPackages: {},
      description: "",
      durationInDays: "",
      price: "",
    });
  };

  /* ---------------- SUBMIT ---------------- */
  const handleSubmit = (e) => {
    e.preventDefault();
    if (!validate()) return;
    // FINAL PAYLOAD (IMPORTANT)
    const payload = {
      planId: planToUpdate?._id,
      data: {
        ...form,
        //✅ For inserting array of strings with this format [0: "some", 1: "another"]
        features: Array.isArray(form.features)
          ? form.features
              .flatMap((f) =>
                typeof f === "string" ? f.split(",").map((x) => x.trim()) : [],
              )
              .filter(Boolean)
          : typeof form.features === "string"
            ? form.features
                .split(",")
                .map((x) => x.trim())
                .filter(Boolean)
            : [],
      },
    };

    /**------> PLAN MUTATION TO UPDATE DATA ------>*/
    planMutation.mutate(payload);
  };

  console.log("Plans", plans);

  /** --------> Use Fetched Data Status Handler --------> */
  const plansDataStatus = useFetchedDataStatusHandler({
    isLoading: plansLoading,
    isError: plansError,
    error: plansErrorObj,
    label: "plans-super-admin",
  });

  return (
    <div>
      <div className="grid lg:grid-cols-12 grid-cols-1 justify-between gap-4">
        <div className="lg:col-span-4 col-span-12 mb-10">
          <PlanForm
            onPlanSubmit={handleSubmit}
            onHandleChange={handleChange}
            formData={form}
            planToUpdate={planToUpdate}
            onCancel={handleCancel}
            PLAN_LIMIT_PRESETS={PLAN_LIMIT_PRESETS}
            planMutation={planMutation}
            setForm={setForm}
            errors={errors}
          />
        </div>

        <div className="lg:col-span-8 col-span-12">
          {plansDataStatus.status !== "success" ? (
            plansDataStatus?.content
          ) : (
            <PlansTable plans={plans} onSelect={handleSelectPlan} />
          )}
        </div>
      </div>
    </div>
  );
};

export default PlansManagement;
