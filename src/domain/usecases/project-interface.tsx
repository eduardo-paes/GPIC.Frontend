import { ActivityType } from "../models/activity-type";
import { Project } from "../models/project";
import { ProjectActivity } from "../models/project-activity";

/**
 * Interface para gerenciamento de projeto.
 * @interface
 */
export interface IProjectService {

    /**
     * Busca todos os projetos abertos.
     * @param {IProjectService.GetParams} params - Os parâmetros para buscar os projetos.
     * @returns {Promise<Array<Project>>} Uma promessa que resolve para a lista de projetos encontrados.
     */
    getOpened(params: IProjectService.GetParams): Promise<Array<Project>>;

    /**
     * Busca todos os projetos fechados.
     * @param {IProjectService.GetParams} params - Os parâmetros para buscar os projetos.
     * @returns {Promise<Array<Project>>} Uma promessa que resolve para a lista de projetos encontrados.
    **/
    getClosed(params: IProjectService.GetParams): Promise<Array<Project>>;

    /**
     * Busca o projeto que possui o id informado.
     * @param {IProjectService.GetParams} params - Os parâmetros para encontrar o projeto.
     * @returns {Promise<Project>} Uma promessa que resolve para o projeto encontrado.
     */
    getById(params: IProjectService.GetParams): Promise<Project>;

    /**
     * Busca as atividades do projeto que possui o id informado.
     * @param {IProjectService.GetActivitiesParams} params - Os parâmetros para encontrar as atividades do projeto.
     * @returns {Promise<Array<ProjectActivity>>} Uma promessa que resolve para a lista de atividades encontradas.
     */
    getActivitiesByProjectId(params: IProjectService.GetActivitiesParams): Promise<Array<ProjectActivity>>;

    /**
     * Adiciona um projeto com base nos parâmetros fornecidos.
     * @param {IProjectService.AddParams} params - Os parâmetros para adicionar o projeto.
     * @returns {Promise<Project>} Uma promessa que resolve para o projeto adicionado.
     */
    add(params: IProjectService.AddParams): Promise<Project>;

    /**
     * Atualiza um projeto com base nos parâmetros fornecidos.
     * @param {IProjectService.UpdateParams} params - Os parâmetros para atualizar o projeto.
     * @returns {Promise<Project>} Uma promessa que resolve para o projeto atualizado.
     */
    update(params: IProjectService.UpdateParams): Promise<Project>;

    /**
     * Submete o projeto.
     * @param {IProjectService.SubmitParams} params - Os parâmetros para atualizar o projeto.
     * @returns {Promise<Project>} Uma promessa que resolve para o projeto atualizado.
     */
    projectSubmit(params: IProjectService.SubmitParams): Promise<Project>;

    /**
     * Solicita recurso para o projeto.
     * @param {IProjectService.AppealParams} params - Os parâmetros para atualizar o projeto.
     * @returns {Promise<Project>} Uma promessa que resolve para o projeto atualizado.
     */
    projectAppeal(params: IProjectService.AppealParams): Promise<Project>;

    /**
     * Remove um projeto com base no id fornecido.
     * @param {IProjectService.DeleteParams} params - Os parâmetros para remover um projeto.
     * @returns {Promise<Project>} Uma promessa que resolve para o projeto removido.
     */
    delete(params: IProjectService.DeleteParams): Promise<Project>;
}

/**
 * Namespace para a interface de gerenciamento de projeto.
 * @namespace IProjectService
 */
export namespace IProjectService {
    /**
     * Parâmetros para buscar projetos.
     * @typedef {Object} GetParams
     */
    export type GetParams = {
        id?: string;
        take?: number;
        skip?: number;
        onlyMyProjects?: boolean;
    };

    /**
     * Parâmetros para buscar as atividades de um projeto.
     * @typedef {Object} GetActivitiesParams
     */
    export type GetActivitiesParams = {
        projectId: string;
    };

    /**
     * Parâmetros para adicionar um projeto.
     * @typedef {Object} AddParams
     */
    export type AddParams = {
        title: string;
        keyWord1: string;
        keyWord2: string;
        keyWord3: string;
        isScholarshipCandidate: boolean;
        objective: string;
        methodology: string;
        expectedResults: string;
        activitiesExecutionSchedule: string;
        activities: Array<ProjectActivity>;
        programTypeId: string;
        professorId: string;
        subAreaId: string;
        noticeId: string;
        studentId: string;
    };

    /**
     * Parâmetros para atualizar um projeto.
     * @typedef {Object} UpdateParams
     */
    export type UpdateParams = {
        id: string;
        title: string;
        keyWord1: string;
        keyWord2: string;
        keyWord3: string;
        isScholarshipCandidate: boolean;
        objective: string;
        methodology: string;
        expectedResults: string;
        activitiesExecutionSchedule: string;
        activities: Array<ProjectActivity>;
        programTypeId: string;
        professorId: string;
        subAreaId: string;
        noticeId: string;
        studentId: string;
    };

    /**
     * Parâmetros para remover um projeto.
     * @typedef {Object} DeleteParams
     */
    export type DeleteParams = {
        id: string;
    };

    /**
     * Parâmetros para submeter o projeto.
     * @typedef {Object} SubmitParams
     */
    export type SubmitParams = {
        id: string;
    };

    /**
     * Parâmetros para solicitar recurso para o projeto.
     * @typedef {Object} AppealParams
     */
    export type AppealParams = {
        id: string;
        appealDescription: string;
    };
}