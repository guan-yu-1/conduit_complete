export default function mapArrayToDictionary(array, identifier = "id") {
  return Object.assign(
    {},
    ...array.map((item) => ({ [item[identifier]]: item }))
  );
}
