import { Student } from "@/domain/models/student";
import { IStudentService } from "@/domain/usecases/student-interface";
import { HttpRequest, HttpResponse, HttpStatusCode, IHttpClient } from "@/infrastructure/data/protocols/http";
import { StudentDTO } from "../models/student-dto";

/**
 * Classe que implementa a interface de adição de usuário.
 * @class
 * @implements {IStudent}
 */
export class StudentService implements IStudentService {
    /**
     * Cria uma instância de StudentService.
     * @constructor
     * @param {string} url - A URL para adicionar um usuário.
     * @param {IHttpClient} httpClient - O cliente HATEOAS para realizar as requisições.
     */
    constructor(
        private readonly url: string,
        private readonly httpClient: IHttpClient
    ) { }

    /**
     * Adiciona um usuário com base nos parâmetros fornecidos.
     * @async
     * @param {IStudentService.AddParams} params - Os parâmetros para adicionar o usuário.
     * @returns {Promise<Student>} Uma promessa que resolve para o usuário adicionado.
     */
    async add(params: IStudentService.AddParams): Promise<Student> {
        const studentDTO: StudentDTO = {
            name: params.name,
            CPF: params.CPF,
            email: params.email,
            password: params.password,
            confirmPassword: params.confirmPassword,
            birthDate: params.birthDate,
            RG: params.RG,
            issuingAgency: params.issuingAgency,
            dispatchDate: params.dispatchDate,
            gender: params.gender,
            race: params.race,
            homeAddress: params.homeAddress,
            city: params.city,
            UF: params.UF,
            CEP: params.CEP,
            registrationCode: params.registrationCode,
            campusId: params.campusId,
            courseId: params.courseId,
            startYear: params.startYear,
            typeAssistanceId: params.typeAssistanceId,
            phoneDDD: params.phoneDDD,
            phone: params.phone,
            cellPhoneDDD: params.cellPhoneDDD,
            cellPhone: params.cellPhone,
        };

        const httpRequest: HttpRequest = {
            url: this.url,
            method: 'POST',
            body: studentDTO
        };

        try {
            const httpResponse: HttpResponse = await this.httpClient.request(httpRequest);

            if (httpResponse.statusCode === HttpStatusCode.ok) {
                return httpResponse.body;
            } else {
                throw new Error('Falha ao criar estudante.');
            }
        } catch (error: any) {
            throw new Error(`Erro ao realizar o cadastro de estudante: ${error.message}`);
        }
    }
}