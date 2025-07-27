/* tslint:disable */
/* eslint-disable */
// Generated using typescript-generator version 3.2.1263 on 2025-07-26 15:18:09.

export interface InventoryItemUpdateDTO {
    itemID: string;
    delta: number;
}

export interface SkuCreateDTO {
    name: string;
    priceInCents: number;
    skuCode: string;
}

export interface SkuDTO {
    skuId: string;
    name: string;
    priceInCents: number;
    skuCode: string;
}

export interface WarehouseCreateDTO {
    name: string;
    address: string;
}

export interface WarehouseDTO {
    id: string;
    name: string;
    address: string;
    inventory: InventoryItem[];
}

export interface WarehouseListDTO {
    id: string;
    name: string;
    address: string;
}

export interface FietsenWachtApplication extends CommandLineRunner {
}

export interface MongoConfiguration extends AbstractMongoClientConfiguration {
}

export interface InventoryListToMapConverter extends Converter<InventoryItem[], { [index: string]: InventoryItem }> {
}

export interface InventoryMapToListConverter extends Converter<{ [index: string]: InventoryItem }, InventoryItem[]> {
}

export interface WebSecurityConfiguration {
}

export interface WorkItemFactory {
}

export interface JobItemController {
}

export interface SKUController {
    skulist: ResponseEntity<SkuDTO[]>;
}

export interface WarehouseController {
    warehouseList: ResponseEntity<WarehouseListDTO[]>;
}

export interface InventoryEntity {
}

export interface InventoryHolder {
    id: string;
    name: string;
    inventory: InventoryItem[];
}

export interface InventoryItem {
    quantity: number;
    sku_ID: string;
}

export interface JobItemEntity {
    jobAddress: Address;
    assignedMechanics: UserEntity[];
}

export interface Address {
    zipCode: string;
    city: string;
    street: string;
}

export interface MobileStorageEntity extends InventoryHolder {
}

export interface SKUEntity {
    id: string;
    name: string;
    priceInCents: number;
    skuCode: string;
}

export interface UserEntity {
    id: string;
    name: string;
}

export interface WarehouseEntity extends InventoryHolder {
    address: string;
}

export interface GlobalExceptionHandler {
}

export interface ResourceNotFoundException extends RuntimeException {
}

export interface SkuIdsDontExistException extends RuntimeException {
    invalidIds: string[];
}

export interface SkuMapper {
}

export interface SkuMapperImpl extends SkuMapper {
}

export interface WarehouseMapper {
}

export interface WarehouseMapperImpl extends WarehouseMapper {
}

export interface IInventoryRepository<T> extends MongoRepository<T, string> {
}

export interface JobRepository extends MongoRepository<JobItemEntity, string> {
}

export interface MobileStorageRepository extends IInventoryRepository<MobileStorageEntity> {
}

export interface SKURepository extends MongoRepository<SKUEntity, string> {
}

export interface UserRepository extends MongoRepository<UserEntity, string> {
}

export interface WarehouseRepository extends IInventoryRepository<WarehouseEntity> {
}

export interface InventoryService<P, T> {
}

export interface JobService {
}

export interface SKUService {
    skulist: SkuDTO[];
}

export interface WarehouseService extends InventoryService<WarehouseEntity, WarehouseRepository> {
    warehouseList: WarehouseListDTO[];
}

export interface CommandLineRunner extends Runner {
}

export interface AbstractMongoClientConfiguration extends MongoConfigurationSupport {
}

export interface ResponseEntity<T> extends HttpEntity<T> {
    statusCode: HttpStatusCode;
    /**
     * @deprecated since 6.0
     */
    statusCodeValue: number;
}

export interface Throwable extends Serializable {
    cause: Throwable;
    stackTrace: StackTraceElement[];
    message: string;
    suppressed: Throwable[];
    localizedMessage: string;
}

export interface StackTraceElement extends Serializable {
    classLoaderName: string;
    moduleName: string;
    moduleVersion: string;
    methodName: string;
    fileName: string;
    lineNumber: number;
    className: string;
    nativeMethod: boolean;
}

export interface RuntimeException extends Exception {
}

export interface Runner {
}

export interface MongoConfigurationSupport {
}

export interface Converter<S, T> {
}

export interface HttpStatusCode extends Serializable {
    error: boolean;
    "3xxRedirection": boolean;
    "1xxInformational": boolean;
    "5xxServerError": boolean;
    "2xxSuccessful": boolean;
    "4xxClientError": boolean;
}

export interface Serializable {
}

export interface Exception extends Throwable {
}

export interface MongoRepository<T, ID> extends ListCrudRepository<T, ID>, ListPagingAndSortingRepository<T, ID>, QueryByExampleExecutor<T> {
}

export interface HttpEntity<T> {
    headers: { [index: string]: string[] };
    body: T;
}

export interface ListCrudRepository<T, ID> extends CrudRepository<T, ID> {
}

export interface ListPagingAndSortingRepository<T, ID> extends PagingAndSortingRepository<T, ID> {
}

export interface QueryByExampleExecutor<T> {
}

export interface CrudRepository<T, ID> extends Repository<T, ID> {
}

export interface PagingAndSortingRepository<T, ID> extends Repository<T, ID> {
}

export interface Repository<T, ID> {
}

export type JobStatus = "PENDING" | "INPROGRESS" | "DONE";
