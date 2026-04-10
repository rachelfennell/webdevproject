
// Overall mark for a module 
const getOverallMark = (moduleId, results, resitCap) => {
  const original = results.find(r => r.module_id === moduleId && r.is_resit === false);
  const resit = results.find(r => r.module_id === moduleId && r.is_resit === true);
  
  let moduleOverallMark = 0;
  
  if (resit) moduleOverallMark = Math.min(resit.mark, resitCap);
  if (original && !resit) moduleOverallMark = original.mark;
  
  return moduleOverallMark;
};

//Checks that a student has all 120 credits needed to pass the year and
//checks that all modules have been passed
const checkYearCredits = (yearResults, resitCap) => {
  const modules = yearResults.filter(r => r.is_resit === false);

  // Check total credits add up to 120
  const sumModuleCredits = modules.reduce((sum, r) => sum + r.Module.credits, 0);
  if (sumModuleCredits !== 120) {
    return { passed: false, reason: `Credits total ${sumModuleCredits} — must be exactly 120` };
  }

  // Check every module has been passed using overall mark
  const hasFail = modules.some(r => {
    const moduleOverallMark = getOverallMark(r.module_id, yearResults, resitCap);
    return moduleOverallMark < 40;
  });

  if (hasFail) {
    return { passed: false, reason: 'Not all modules have been passed' };
  }

  return { passed: true };
};

//Calculates the overall year average
const calculateYearAverage = (yearResults, resitCap) => {
  let sumWeightedMarks = 0;
  let sumModuleCredits = 0;

  const modules = yearResults.filter(r => r.is_resit === false);

  modules.forEach(r => {
    const moduleOverallMark = getOverallMark(r.module_id, yearResults, resitCap);
    sumWeightedMarks += moduleOverallMark * r.Module.credits;
    sumModuleCredits += r.Module.credits;
  });

  if (sumModuleCredits === 0) return 0;
  return Number((sumWeightedMarks / sumModuleCredits).toFixed(2));
};

// Get classification from final average
const getClassificationLabel = (average) => {
  if (average >= 70) return 'First Class Honours';
  if (average >= 60) return 'Upper Second Class (2:1)';
  if (average >= 50) return 'Lower Second Class (2:2)';
  if (average >= 40) return 'Third Class Honours';
  return 'Fail';
};

//Main method for classification to return all results
export const classifyStudent = (results, programme) => {
  const { y2_weight, y3_weight, resit_cap } = programme;

  const y1Results = results.filter(r => r.year_level === '1' || r.year_level === 1);
  const y2Results = results.filter(r => r.year_level === '2' || r.year_level === 2);
  const y3Results = results.filter(r => r.year_level === '3' || r.year_level === 3);

  // Check each year using checkYearCredits
  const y1Check = checkYearCredits(y1Results, resit_cap);
  if (!y1Check.passed) return { eligible: false, reason: `Year 1: ${y1Check.reason}` };

  const y2Check = checkYearCredits(y2Results, resit_cap);
  if (!y2Check.passed) return { eligible: false, reason: `Year 2: ${y2Check.reason}` };

  const y3Check = checkYearCredits(y3Results, resit_cap);
  if (!y3Check.passed) return { eligible: false, reason: `Year 3: ${y3Check.reason}` };

  // Calculate averages using calculateYearAverage
  const y2Average = calculateYearAverage(y2Results, resit_cap);
  const y3Average = calculateYearAverage(y3Results, resit_cap);

const finalAverage = Number(((y2Average * y2_weight) + (y3Average * y3_weight)).toFixed(2));

return {
  eligible: true,
  y2_average: y2Average,
  y3_average: y3Average,
  final_average: finalAverage,
  proposed_outcome: getClassificationLabel(finalAverage)
};
};
