import { GraphQLSchema, GraphQLField, ExecutionResult, GraphQLType, GraphQLFieldResolver, GraphQLResolveInfo, GraphQLIsTypeOfFn, GraphQLTypeResolver, GraphQLScalarType, DocumentNode } from 'graphql';
import { SchemaDirectiveVisitor } from './schemaVisitor';
export declare type UnitOrList<Type> = Type | Array<Type>;
export interface IResolverValidationOptions {
    requireResolversForArgs?: boolean;
    requireResolversForNonScalar?: boolean;
    requireResolversForAllFields?: boolean;
    requireResolversForResolveType?: boolean;
    allowResolversNotInSchema?: boolean;
}
export interface IAddResolveFunctionsToSchemaOptions {
    schema: GraphQLSchema;
    resolvers: IResolvers;
    resolverValidationOptions?: IResolverValidationOptions;
    inheritResolversFromInterfaces?: boolean;
}
export interface IResolverOptions<TSource = any, TContext = any> {
    resolve?: IFieldResolver<TSource, TContext>;
    subscribe?: IFieldResolver<TSource, TContext>;
    __resolveType?: GraphQLTypeResolver<TSource, TContext>;
    __isTypeOf?: GraphQLIsTypeOfFn<TSource, TContext>;
}
export declare type MergeInfo = {
    delegate: (type: 'query' | 'mutation' | 'subscription', fieldName: string, args: {
        [key: string]: any;
    }, context: {
        [key: string]: any;
    }, info: GraphQLResolveInfo) => any;
};
export declare type IFieldResolver<TSource, TContext> = (source: TSource, args: {
    [argument: string]: any;
}, context: TContext, info: GraphQLResolveInfo & {
    mergeInfo: MergeInfo;
}) => any;
export declare type ITypedef = (() => ITypedef[]) | string | DocumentNode;
export declare type ITypeDefinitions = ITypedef | ITypedef[];
export declare type IResolverObject<TSource = any, TContext = any> = {
    [key: string]: IFieldResolver<TSource, TContext> | IResolverOptions;
};
export declare type IEnumResolver = {
    [key: string]: string | number;
};
export interface IResolvers<TSource = any, TContext = any> {
    [key: string]: (() => any) | IResolverObject<TSource, TContext> | GraphQLScalarType | IEnumResolver;
}
export interface ILogger {
    log: (message: string | Error) => void;
}
export interface IConnectorCls<TContext = any> {
    new (context?: TContext): any;
}
export declare type IConnectorFn<TContext = any> = (context?: TContext) => any;
export declare type IConnector<TContext = any> = IConnectorCls<TContext> | IConnectorFn<TContext>;
export declare type IConnectors<TContext = any> = {
    [key: string]: IConnector<TContext>;
};
export interface IExecutableSchemaDefinition<TContext = any> {
    typeDefs: ITypeDefinitions;
    resolvers?: IResolvers<any, TContext> | Array<IResolvers<any, TContext>>;
    connectors?: IConnectors<TContext>;
    logger?: ILogger;
    allowUndefinedInResolve?: boolean;
    resolverValidationOptions?: IResolverValidationOptions;
    directiveResolvers?: IDirectiveResolvers<any, TContext>;
    schemaDirectives?: {
        [name: string]: typeof SchemaDirectiveVisitor;
    };
    parseOptions?: GraphQLParseOptions;
    inheritResolversFromInterfaces?: boolean;
}
export declare type IFieldIteratorFn = (fieldDef: GraphQLField<any, any>, typeName: string, fieldName: string) => void;
export declare type NextResolverFn = () => Promise<any>;
export declare type DirectiveResolverFn<TSource = any, TContext = any> = (next: NextResolverFn, source: TSource, args: {
    [argName: string]: any;
}, context: TContext, info: GraphQLResolveInfo) => any;
export interface IDirectiveResolvers<TSource = any, TContext = any> {
    [directiveName: string]: DirectiveResolverFn<TSource, TContext>;
}
export declare type IMockFn = GraphQLFieldResolver<any, any>;
export declare type IMocks = {
    [key: string]: IMockFn;
};
export declare type IMockTypeFn = (type: GraphQLType, typeName?: string, fieldName?: string) => GraphQLFieldResolver<any, any>;
export interface IMockOptions {
    schema: GraphQLSchema;
    mocks?: IMocks;
    preserveResolvers?: boolean;
}
export interface IMockServer {
    query: (query: string, vars?: {
        [key: string]: any;
    }) => Promise<ExecutionResult>;
}
export declare type ResolveType<T extends GraphQLType> = (type: T) => T;
export declare type GraphQLParseOptions = {
    noLocation?: boolean;
    allowLegacySDLEmptyFields?: boolean;
    allowLegacySDLImplementsInterfaces?: boolean;
    experimentalFragmentVariables?: boolean;
};
