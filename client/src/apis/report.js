import { ReportV1 } from "@/constants/endpoints";
import { apiClient } from "./apiClient";
import qs from "query-string";
import useReportStore from "@/hooks/useReportStore";

export const createReport = async (value) => {
    const url = qs.stringifyUrl({
        url: ReportV1.CREATE_REPORTS,
    });
    const { data } = await apiClient.post(url, value);
    return data;
};

export const getReports = async () => {
    const {
        filters: { page, limit, isActive, isProcess, reporterId, reportedId },
    } = useReportStore.getState();
    const url = qs.stringifyUrl({
        url: ReportV1.GET_REPORTS,
        query: {
            page,
            limit,
            isActive,
            isProcess,
            reporterId,
            reportedId,
        },
    });
    const { data } = await apiClient.get(url);
    return data;
};

export const loadMoreReport = async (
    page,
    limit,
    isActive,
    isProcess,
    reporterId,
    reportedId
) => {
    const url = qs.stringifyUrl({
        url: ReportV1.GET_REPORTS,
        query: {
            page,
            limit,
            isActive,
            isProcess,
            reporterId,
            reportedId,
        },
    });
    const { data } = await apiClient.get(url);
    return data;
};

export const deleteReport = async (id) => {
    const url = qs.stringifyUrl({
        url: ReportV1.DELETE_REPORTS + id,
    });
    const { data } = await apiClient.delete(url);
    return data;
};

export const updateReport = async (id, value) => {
    const url = qs.stringifyUrl({
        url: ReportV1.UPDATE_REPORTS + id,
    });
    const { data } = await apiClient.put(url, value);
    return data;
};

export const acceptReport = async (id, userId) => {
    const url = qs.stringifyUrl({
        url: ReportV1.UPDATE_REPORTS_ACCEPT + id,
    });
    const { data } = await apiClient.put(url, { userId });
    return data;
};

export const refuseReport = async (id) => {
    const url = qs.stringifyUrl({
        url: ReportV1.UPDATE_REPORTS_REFUSE + id,
    });
    const { data } = await apiClient.put(url);
    return data;
};
