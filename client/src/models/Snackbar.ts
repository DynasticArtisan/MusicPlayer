export interface ISnackbar {
    message :string;
    severity :severity;
    id :number;
}

export type severity = 'error' | 'success';