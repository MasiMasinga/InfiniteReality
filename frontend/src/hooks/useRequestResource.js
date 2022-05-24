import { useCallback, useState, useContext } from "react";
import axios from "axios";
import { useSnackbar } from "notistack";
import formatHttpApiError from "../helpers/formatHttpApiError";
import getCommonOptions from "../helpers/axios/getCommonOption";
import { LoadingOverlayResourceContext } from "../components/LoadingOverlayResource";

export default function useRequestResource({ endpoint, resourceLabel }) {
  const [resourceList, setResourceList] = useState({
    results: [],
  });
  const [resource, setResource] = useState(null);
  const [error, setError] = useState(null);
  const { enqueueSnackbar } = useSnackbar();
  const loadingOverlay = useContext(LoadingOverlayResourceContext);
  const { setLoading } = loadingOverlay;

  const handleRequestResourceError = useCallback(
    (err) => {
      const formattedError = formatHttpApiError(err);
      setError(formattedError);
      setLoading(false);
      enqueueSnackbar(formattedError);
    },
    [enqueueSnackbar, setError, setLoading]
  );

  const addResource = useCallback(
    (values, successCallback) => {
      setLoading(true);
      axios
        .post(`/api/${endpoint}/`, values, getCommonOptions())
        .then(() => {
          setLoading(false);
          enqueueSnackbar(`${resourceLabel} added`);
          if (successCallback) {
            successCallback();
          }
        })
        .catch(handleRequestResourceError);
    },
    [
      endpoint,
      enqueueSnackbar,
      resourceLabel,
      handleRequestResourceError,
      setLoading,
    ]
  );

  const getResourceList = useCallback(
    ({ query = "" } = {}) => {
      setLoading(true);
      axios
        .get(`/api/${endpoint}/${query}`, getCommonOptions())
        .then((res) => {
          setLoading(false);
          if (res.data.results) {
            setResourceList(res.data);
          } else {
            setResourceList({
              results: res.data,
            });
          }
        })
        .catch(handleRequestResourceError);
    },
    [endpoint, handleRequestResourceError, setLoading]
  );

  const getResource = useCallback(
    (id) => {
      setLoading(true);
      axios
        .get(`/api/${endpoint}/${id}/`, getCommonOptions())
        .then((res) => {
          setLoading(false);
          const { data } = res;
          setResource(data);
        })
        .catch(handleRequestResourceError);
    },
    [endpoint, handleRequestResourceError, setLoading]
  );

  return {
    resourceList,
    addResource,
    getResourceList,
    getResource,
  };
}
